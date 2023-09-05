'use client';

import { usePostMessagesMutation } from "@/app/apis/messages.api";
import useConversation from "@/app/hooks/useConversation";
import { useAppSelector } from "@/app/redux/store";
import { CldUploadButton } from "next-cloudinary";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import {
    HiPaperAirplane,
    HiPhoto
} from "react-icons/hi2";
import MessagesInput from "./messages-input";

export default function Form() {
    const { conversationId } = useConversation();
    const { user } = useAppSelector((state) => state.auth)
    const [postMessageApi] = usePostMessagesMutation()

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        postMessageApi(
            {
                ...data,
                conversationId,
                email: user.email,
            },
        )
    }

    const handleUpload = (result: any) => {
        postMessageApi(
            {
                image: result.info.secure_url,
                conversationId: conversationId,
                email: user.email,
            },
        )

    }
    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="lirdroue"
            >
                <HiPhoto size={30} className="text-sky-500" />
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessagesInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type="submit"
                    className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
                    <HiPaperAirplane
                        size={18}
                        className="text-white"
                    />
                </button>
            </form>
        </div>
    )
}
