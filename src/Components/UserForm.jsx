import React, { useState } from "react";
import * as Yup from "yup";

import Modal from "./Modal";
import { CloseIcon } from "./Icons";

import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { setTableData } from "../redux/slice/tableSlice";
import { userValidationSchema } from "../schemas/productFormSchema";

const UserForm = ({ open, editId, handlClose }) => {
  const { tableData } = useSelector((store) => store.table);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: editId?.id ?? "",
    name: editId?.name ?? "",
    email: editId?.email ?? "",
    phone: editId?.phone ?? "",
    city: editId?.address?.city ?? "",
    zipCode: editId?.address?.zipcode ?? "",
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    zipCode: "",
  });

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    try {
      await Yup.reach(userValidationSchema, name).validate(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await userValidationSchema.validate(formData, { abortEarly: false });

      let updatedData = {
        ...formData,
        address: { city: formData.city, zipcode: formData?.zipCode },
        id: editId?.id ? editId?.id : tableData.length + 1,
      };

      if (editId) {
        let updatedEditData = tableData?.map((data) =>
          data.id === editId.id ? updatedData : data
        );
        dispatch(setTableData(updatedEditData));
      } else {
        dispatch(setTableData([...tableData, updatedData]));
      }
      handlClose();
    } catch (error) {
      console.error(error.errors);
    }
  };

  return (
    <Modal isOpen={open}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Product
            </h3>
            <button
              type="button"
              onClick={handlClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-target="createProductModal"
              data-modal-toggle="createProductModal"
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <InputField
                label={"Name"}
                type="text"
                name={"name"}
                value={formData?.name}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.name}
              />
              <InputField
                label={"Email"}
                type="email"
                name={"email"}
                value={formData?.email}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.email}
              />
              <InputField
                label="Phone"
                type="tel"
                name="phone"
                value={formData?.phone}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.phone}
              />
              <InputField
                label="City"
                type="text"
                name="city"
                value={formData?.city}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors.city}
              />
              <InputField
                label="Zip Code"
                type="text"
                name="zipCode"
                value={formData?.zipCode}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={errors?.zipCode}
              />
            </div>
            <div className="flex justify-end gap-1">
              <button
                type="button"
                onClick={handlClose}
                className="flex w-[100px] mt-3 mr self-end text-center h-11 mr-3 items-center bg-blue-950 justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex w-[100px] mt-3 mr self-end text-center h-11 mr-3 items-center bg-blue-950 justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UserForm;
