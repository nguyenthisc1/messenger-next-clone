"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useCreateConversationMutation } from "@/app/apis/conversations.api";
import { useAppSelector } from "@/app/redux/store";
import { toast } from "react-hot-toast";
import Button from "../button";
import { Input } from "../inputs/input";
import Select from "../inputs/select";
import Modal from "./modal";

interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: UserItem[];
}

export default function GroupChatModal({
    isOpen,
    onClose,
    users = [],
}: GroupChatModalProps) {
    const { user: currentUser } = useAppSelector((state) => state.auth)
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [createConversationApi] = useCreateConversationMutation()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            userId: '',
            email: '',
            name: "",
            members: [],
        },
    });

    const members = watch("members");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        onClose();

        createConversationApi({
            ...data,
            isGroup: true,
            email: currentUser.email,
        }).unwrap()
            .then(() => {
                router.refresh();
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2
                            className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
                        >
                            Create a group chat
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Create a chat with more than 2 people.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name,
                                }))}
                                onChange={(value) =>
                                    setValue("members", value, {
                                        shouldValidate: true,
                                    })
                                }
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button disabled={isLoading} type="submit">
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
