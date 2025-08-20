import NoteDetails from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePage = async ({ params }: Props) => {
  console.log(await params);
  const { id: noteId } = await params;
  return <NoteDetails id={noteId} />;
};

export default NotePage;
