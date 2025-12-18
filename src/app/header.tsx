import ThemeToggle from "@/components/theme/theme-toggle";
import UserDropdown from "@/components/common/user-dropdown";
import { getServerSession } from "@/lib/get-server-session";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          NextJS 16
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
