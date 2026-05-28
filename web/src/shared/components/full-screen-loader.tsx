export function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas text-foreground">
      <div className="flex items-center gap-3 text-xl font-bold">
        <img
          alt=""
          aria-hidden="true"
          className="size-10 rounded-xl"
          height="40"
          src="/logo.png"
          width="40"
        />
        <span>Broadcast</span>
      </div>
    </div>
  )
}
