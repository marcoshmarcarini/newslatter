import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage  from "../../../utils/firebase"; // Importar o Firebase Storage

// Adaptador de upload funcional
const MyUploadAdapter = (loader: any) => {
  return {
    upload: () =>
      new Promise((resolve, reject) => {
        loader.file
          .then((file: File) => {
            const storageRef = ref(storage.storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
              "state_changed",
              () => {},
              (error) => {
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve({
                    default: downloadURL,
                  });
                });
              }
            );
          })
          .catch((error: any) => {
            reject(error);
          });
      }),
    abort: () => {
      // Código para abortar upload, se necessário
    },
  };
};

// Plugin que será adicionado ao CKEditor
const MyCustomUploadAdapterPlugin = (editor: any) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return MyUploadAdapter(loader);
  };
};

export default MyCustomUploadAdapterPlugin;