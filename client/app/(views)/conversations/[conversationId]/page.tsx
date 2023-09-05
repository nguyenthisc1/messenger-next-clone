'use client'

import { useGetConversationByIdQuery } from "@/app/apis/conversations.api";
import { PATH } from "@/app/constants/path";
import storage from "@/app/helpers/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Body from "./components/body";
import Form from "./components/form";
import Header from "./components/header";

interface IParams {
  conversationId: string;
}

const ConversationId = ({ params }: { params: IParams }) => {
  const token = storage.getAccessToken()
  const router = useRouter()
  const conversationApi = useGetConversationByIdQuery(params.conversationId);

  useEffect(() => {
    if (!token) {
      router.push(PATH.HOME)
    }
  }, [router, token])

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        {conversationApi.isSuccess ? <Header conversation={conversationApi.data?.data} /> : null}

        <Body />

        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
