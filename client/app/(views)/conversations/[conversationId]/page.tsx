import { useGetConversationByIdQuery } from "@/app/apis/conversations.api";
import { useGetMessagesQuery } from "@/app/apis/messages.api";
interface IParams {
  conversationId: string;
}
const ConversationId = ({ params }: { params: IParams }) => {
  const conversation = useGetConversationByIdQuery(params.conversationId);
  const messages = useGetMessagesQuery(params.conversationId);

  return <div></div>;
};

export default ConversationId;
