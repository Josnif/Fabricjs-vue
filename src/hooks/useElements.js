import { ref, inject, reactive, onMounted } from 'vue';
import { fabric } from 'fabric';
import { defaultNavElement } from '@design/constants';
import { handleDelete } from '@design/lib/key-events';

export default function useElements(providedFabricRef = null, providedCanvasRef = null) {
  const activeElement = ref(defaultNavElement);
  const imageInputRef = ref(null);
  const fabricRef = providedFabricRef || inject('fabricRef', ref(null));
  const canvasRef = providedCanvasRef || inject('canvasRef', ref(null));

  const undo = ref(null);
  const redo = ref(null);
  const shapeRef = ref(null);
  const activeObjectRef = ref(null);
  const isDrawing = ref(false);
  const selectedShapeRef = ref(false);
  const isEditingRef = ref(false);  
  
  const setActiveElement = (value) => {
    activeElement.value = value;
  };

  const elementAttributes = reactive({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });

  const setElementAttributes = (newAttributes) => {
    Object.assign(elementAttributes, {
      ...elementAttributes,
      ...newAttributes,
    });
  };

  const syncShapeInStorage = () => {};
  const deleteShapeFromStorage = () => {}
  
  const deleteAllShapes = () => {
    console.log('delete all shapes');
  }

  const handleActiveElement = (elem) => {
    activeElement.value = elem;

    switch (elem?.value) {
      case "reset":
        deleteAllShapes();
        // clear the canvas
        fabricRef.value?.clear();
        activeElement.value = defaultNavElement;
        break;

      // delete the selected shape from the canvas
      case "delete":
        // delete it from the canvas
        handleDelete(canvasRef.value, deleteShapeFromStorage);
        activeElement.value = defaultNavElement;
        break;

      // upload an image to the canvas
      case "image":
        // trigger the click event on the input element which opens the file dialog
        imageInputRef.value?.click();
        /**
         * set drawing mode to false
         * If the user is drawing on the canvas, we want to stop the
         * drawing mode when clicked on the image item from the dropdown.
         */
        isDrawing.value = false;

        if (fabricRef.value) {
          // disable the drawing mode of canvas
          fabricRef.value.isDrawingMode = false;
        }
        break;

      // for comments, do nothing
      case "comments":
        break;

      default:
        // set the selected shape to the selected element
        selectedShapeRef.value = elem?.value;
        break;
    }
  };

  const handleImageUpload = () => {
    const imgElement = document.createElement('img');
    imgElement.src = 'path/to/your/image.jpg';
    imgElement.onload = () => {
      const imgInstance = new fabric.Image(imgElement, {
        left: 100,
        top: 100,
        angle: 0,
        opacity: 1,
      });
      fabricRef.value.add(imgInstance);
    };
  };

  return {
    fabricRef,
    canvasRef,
    activeElement,
    imageInputRef,
    
    handleActiveElement,

    selectedShapeRef,
    isDrawing,
    shapeRef,
    syncShapeInStorage,
    activeObjectRef,
    setActiveElement,
    isEditingRef,
    setElementAttributes,
    undo,
    redo,
    deleteShapeFromStorage,
  };
}