import { ref } from 'vue';
import { v4 as uuidv4 } from "uuid";
import { fabric } from "fabric";
import {
  handleCanvasMouseDown,
  handleCanvaseMouseMove,
  handleCanvasMouseUp,
  handlePathCreated,
  handleCanvasObjectModified,
  handleCanvasObjectMoving,
  handleCanvasSelectionCreated,
  handleCanvasObjectScaling,
  handleCanvasZoom,
  handleResize,
} from '@design/lib/canvas';
import { handleKeyDown } from "@design/lib/key-events";


export default function useFabricEvents({
  canvas,
  fabricRef,
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
}) {
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });
  
    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      });
    });
  
    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        syncShapeInStorage,
        setActiveElement,
      });
    });
  
    canvas.on("path:created", (options) => {
      handlePathCreated({
        options,
        syncShapeInStorage,
      });
    });
  
    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      });
    });
  
    canvas.on("object:moving", (options) => {
      handleCanvasObjectMoving({
        options,
      });
    });
  
    canvas.on("selection:created", (options) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      });
    });
  
    canvas.on("object:scaling", (options) => {
      handleCanvasObjectScaling({
        options,
        setElementAttributes,
      });
    });
  
    canvas.on("mouse:wheel", (options) => {
      handleCanvasZoom({
        options,
        canvas,
      });
    });
  
    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.value,
      });
    });
  
    window.addEventListener("keydown", (e) =>
      handleKeyDown({
        e,
        canvas: fabricRef.value,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      })
    );
  
    return () => {
      canvas.dispose();
  
      window.removeEventListener("resize", () => {
        handleResize({
          canvas: null,
        });
      });
  
      window.removeEventListener("keydown", (e) =>
        handleKeyDown({
          e,
          canvas: fabricRef.value,
          undo,
          redo,
          syncShapeInStorage,
          deleteShapeFromStorage,
        })
      );
    };  
}