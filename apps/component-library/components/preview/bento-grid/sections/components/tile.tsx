export function Tile({ title, body }: { title: string; body?: string }) {
  return (
    <div className="flex h-full flex-col justify-end gap-1 p-4">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </p>
      {body && (
        <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
          {body}
        </p>
      )}
    </div>
  );
}
