"use client";
import dynamic from 'next/dynamic'

const RecentChatsList = dynamic(
  () => import("@/components/chat/RecentChatsList"),
  { ssr: false }
)
const RecentChatsPage: React.FC = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <RecentChatsList/>
    </div>
  );
};

export default RecentChatsPage;