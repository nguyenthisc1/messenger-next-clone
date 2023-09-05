import Sidebar from "../../components/sidebar/sidebar";
import UserList from "./components/user-list";

export default function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <Sidebar>
            <div className="h-full">
                <UserList />
                {children}
            </div>
        </Sidebar>
    );
}
