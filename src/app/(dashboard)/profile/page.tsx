import { ProfileForm } from "@/components/profile/profile-form";
import { PasswordForm } from "@/components/profile/password-form";
import { DeleteAccount } from "@/components/profile/delete-account";
import { userService } from "@/services/user-service";

export default async function ProfilePage() {
  const user = await userService.getMe();

  if (!user) return null;

  return (
    <div className="space-y-12 pb-20">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
            Manage your personal information and security.
          </p>
        </div>

        <div className="space-y-10">
          <section className="space-y-6">
            <ProfileForm user={user} />
          </section>

          <section className="space-y-6">
            <PasswordForm />
          </section>

          <section className="pt-8 border-t border-foreground/5">
            <DeleteAccount />
          </section>
        </div>
      </div>
    </div>
  );
}
