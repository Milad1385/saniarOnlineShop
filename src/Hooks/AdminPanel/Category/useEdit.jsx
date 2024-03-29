import { useMutation, useQueryClient } from "react-query";
import { updateCategory } from "../../../services/categoryApi";

function useEdit(close, onInfo) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      close();
      onInfo({
        title: "دسته بندی با موفقیت ویرایش شد",
      });
    },
  });
}

export default useEdit;
