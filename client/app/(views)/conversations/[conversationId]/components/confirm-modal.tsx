import { useDeleteConversationMutation } from '@/app/apis/conversations.api';
import Button from '@/app/components/button';
import Modal from '@/app/components/modals/modal';
import useConversation from '@/app/hooks/useConversation';
import { useAppSelector } from '@/app/redux/store';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

export default function ConfirmModal({ isOpen, onClose }: ConfirmModalProps) {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth)
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);
    const [deleteConversationApi] = useDeleteConversationMutation()

    const onDelete = useCallback(() => {
        setIsLoading(true);
        onClose();
        deleteConversationApi({ id: conversationId, email: user.email }).unwrap().then(() => {
     
            router.push('/conversations');
            toast.success("Deleted!")
            router.refresh();
        })
            .catch((error) => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))

    }, [deleteConversationApi, conversationId, user.email, onClose, router]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete conversation
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete this conversation? This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}
