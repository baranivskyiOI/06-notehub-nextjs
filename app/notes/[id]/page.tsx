import { QueryClient } from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePage = async ({ params }: Props) => {
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey; ["notes"]
  })


  const { id: noteId } = await params;
  return (

  )
};

export default NotePage;
