import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";
import { fetchNoteByID } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePage = async ({ params }: Props) => {
  const { id: noteId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", noteId],
    queryFn: () => fetchNoteByID(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={noteId} />
    </HydrationBoundary>
  );
};

export default NotePage;
