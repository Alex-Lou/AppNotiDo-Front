function UserProfile({ username }) {
  return (
    <div className="mb-8 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-100 via-teal-100 to-orange-100 px-5 py-4 shadow-md dark:border-amber-800/70 dark:bg-gradient-to-br dark:from-amber-900/60 dark:via-stone-900/70 dark:to-slate-900/60">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-teal-500 to-orange-500 text-base font-bold text-white shadow-md dark:from-amber-600 dark:via-orange-600 dark:to-rose-600">
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-base font-bold text-slate-900 dark:text-amber-50">
            {username}
          </p>
          <p className="text-xs font-medium text-slate-800/80 dark:text-amber-200/70">
            Utilisateur actif
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;