import React, { useEffect, useState } from "react";
import axiosJWT from "../../Utils/AxiosService";
import { CHAT_API } from "../../Constants/Index";
import { useAppSelector } from "../../Redux/Store/Store";
import Conversation from "./Conversation";

const ConversationsList: React.FC = () => {
    const doctor = useAppSelector((state) => state.DoctorSlice);
    const [conversations, setConversations] = useState<any[]>([]);

    useEffect(() => {
        if (!doctor.id) return;

        const fetchConversations = async () => {
            try {
                const response: any = await axiosJWT.get(
                  `${CHAT_API}/conversations/${doctor.id}`
                );
                const conversationData = response.data ?? [];
                const sortedConversations = [...conversationData].sort(
                  (a: any, b: any) =>
                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                );
                setConversations(sortedConversations);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        fetchConversations();
    }, [doctor.id]);

    return (
        <div>
            {conversations.map((conversation) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    lastMessage={{
                        text: "",
                        senderId: "",
                        createdAt: "",
                    }}
                      />
            ))}
        </div>
    );
};

export default ConversationsList;
