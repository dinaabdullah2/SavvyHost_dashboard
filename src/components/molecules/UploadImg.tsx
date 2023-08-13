import React from "react";
import { IconUpload } from "@tabler/icons-react";
import { useFormikContext } from "formik";
import ImageUploading, { ImageListType } from "react-images-uploading";
const UploadImg = (name:string) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const { setFieldValue } = useFormikContext(); /////////// STATES

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setFieldValue(
      name,
      setImages(imageList as never[])
    );
  };
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
                className="px-[300px] py-[100px]"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
upload
                {/* <UploadSvgIcon stroke={"#A0A0A0"} /> */}
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
                        delete
                        {/* <SvgDeleteIcon stroke={"#ff0000"} /> */}
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
  );
};

export default UploadImg;
