import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { editUser } from "../../../services/userApi";

function useEdit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export default useEdit;
