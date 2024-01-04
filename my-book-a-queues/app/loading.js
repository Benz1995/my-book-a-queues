export default async function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
            <div className="w-full min-h-screen grid justify-items-center items-center">
                <span className="loading loading-ring w-20"></span>
            </div>
            )
}