import { mocks, mockImages } from "./mock";
import camelize from "camelize";

export const buildingsRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

export const buildingsTransform = ({ results = [] }) => {
  return camelize(results);
};
