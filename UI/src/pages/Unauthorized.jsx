export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="text-gray-400">
        You don’t have permission to access this page.
      </p>
    </div>
  );
}
