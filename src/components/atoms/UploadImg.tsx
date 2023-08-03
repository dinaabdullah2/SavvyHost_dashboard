import React, { useState } from "react"
import { IconUpload } from '@tabler/icons-react';
import ImageUploading, { ImageListType } from "react-images-uploading"
import { useFormikContext } from "formik"
import { IconTrash } from '@tabler/icons-react';

const UploadImg = (name:any) => {
  console.log("🚀 ~ file: UploadImg.tsx:10 ~ UploadImg ~ name:", name)
  const [images, setImages] = React.useState([])
  const maxNumber = 69
  const { setFieldValue } = useFormikContext() /////////// STATES

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {

    setFieldValue(name,setImages(imageList as never[]))

    // console.log(images[0],'img')
  }
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper  relative w-1/2 border rounded-md ">
          <div className=" flex  items-center justify-center">
            <div className="">
              <button
                type="button"
                className="px-[100px] py-[100px]"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <IconUpload />

              </button>
            </div>
            <div className="absolute w-full">
              {imageList.map((image, index) => (
                <div key={index} className="image-item w-full ">
                  <div>
                    <img
                      src={image.dataURL}
                      className="w-full h-full rounded-md"
                      alt=""
                    />
                  </div>
                  <div className="  image-item__btn-wrapper ">
                    <div className="absolute top-0 left-0 bg-gray-200 p-1 rounded-md m-2 flex">
                      <button
                        type="button"
                        onClick={() => onImageUpdate(index)}
                      >
                        <IconUpload />
                      </button>
                    </div>
                    <div className="absolute top-0 right-0 bg-gray-200 p-1 rounded-md m-2 flex">
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ImageUploading>
  )
}

export default UploadImg
