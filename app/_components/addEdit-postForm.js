import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Image, X, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { addPost } from "@/redux/postSlice";

const validationSchema = Yup.object({
  Title: Yup.string().required("Title is required"),
  Body: Yup.string().required("Body is required"),
});

function AddEditPostForm({ categories }) {
  const dispatch = useDispatch();

  return (
    <div className=" overflow-y-auto w-full max-w-full mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex-shrink-0"></div>
        <div>
          <h3 className="font-semibold">John Doe</h3>
        </div>
      </div>

      <Formik
        initialValues={{ Title: "", Body: "", Categories: [], Files: [] }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const { Title, Body, Files, Categories } = values;
          console.log(values);
          dispatch(addPost({ Title, Body, Files, Categories }));
          resetForm();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* Title Input */}
            <div>
              <Field
                type="text"
                name="Title"
                className="w-full p-2  rounded-md focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Post Title"
              />
            </div>

            {/* Categories (Multiple Select) */}
            <div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <label
                    key={cat.categoryId}
                    className={`px-3 py-1 border border-gray-500 rounded-md cursor-pointer ${
                      values.Categories.includes(cat.categoryId)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <Field
                      type="checkbox"
                      name="Categories"
                      value={cat.categoryId}
                      className="hidden"
                      onChange={() => {
                        setFieldValue(
                          "Categories",
                          values.Categories.includes(cat.categoryId)
                            ? values.Categories.filter(
                                (c) => c !== cat.categoryId
                              )
                            : [...values.Categories, cat.categoryId]
                        );
                      }}
                    />
                    {cat.categoryName}
                  </label>
                ))}
              </div>
            </div>

            {/* Post Body  */}
            <Field
              as="textarea"
              name="Body"
              className="w-full p-3  rounded-md min-h-[120px] resize-none focus:outline-none focus:ring focus:ring-green-300"
              placeholder="What's on your mind, John?"
            />

            {/* Files Preview */}
            {values.Files.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {values.Files.map((file, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-28 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "Files",
                          values.Files.filter((_, i) => i !== index)
                        )
                      }
                      className="absolute top-2 right-2 bg-gray-800 bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Files */}
            <div className="flex items-center justify-between">
              <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Image className="w-6 h-6 text-green-500" />
                <input
                  name="Files"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => {
                    const files = Array.from(event.target.files);
                    setFieldValue("Files", [...values.Files, ...files]);
                  }}
                />
              </label>
            </div>

            {/* Post Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md font-medium text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!values.Title || !values.Body}
            >
              Post
              <Send className="w-5 h-5" />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddEditPostForm;
