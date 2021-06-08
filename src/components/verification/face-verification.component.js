import React, { useState, useEffect, useContext } from "react";
import ImageEditor from "@react-native-community/image-editor";
import styled from "styled-components/native";
import Svg, { Rect } from "react-native-svg";

import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";

const FaceRectangle = styled(Svg)`
  margin-top: -75px;
`;

export const FaceVerification = ({ faces, photo }) => {
  //   function imageToTensor(rawImageData) {
  //     //Function to convert jpeg image to tensors
  //     const TO_UINT8ARRAY = true;
  //     const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  //     // Drop the alpha channel info for mobilenet
  //     const buffer = new Uint8Array(width * height * 3);
  //     let offset = 0; // offset into original data
  //     for (let i = 0; i < buffer.length; i += 3) {
  //       buffer[i] = data[offset];
  //       buffer[i + 1] = data[offset + 1];
  //       buffer[i + 2] = data[offset + 2];
  //       offset += 4;
  //     }
  //     return tf.tensor3d(buffer, [height, width, 3]);
  //   }

  //   useEffect(() => {
  //     (async () => {
  //       if (faces.faces.length) {
  //         getFaceEncoding(faces, photo);
  //       }
  //     })();
  //   }, [faces]);

  return (
    <>
      {!!faces.faces.length && (
        <FaceRectangle>
          <Rect
            key={faces.faces[0].faceID}
            x={faces.faces[0].bounds.origin.x + 33}
            y={faces.faces[0].bounds.origin.y}
            height={faces.faces[0].bounds.size.height}
            width={faces.faces[0].bounds.size.width - 65}
            stroke="black"
            strokeWidth={2}
          />
        </FaceRectangle>
      )}
    </>
  );
};
