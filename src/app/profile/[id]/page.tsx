export default function UserProfile({ params } : { params: { id: string } }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <h1 className="text-4xl font-bold text-white">Welcome to your Profile Page</h1>
            <p className="text-lg text-gray-400">User ID: {params.id}</p>
        </div>
    );
}