import { Icons } from "@/client/components/ui/icons"

export const LoadingPage = () => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0  bg-darkGray bg-opacity-75 flex items-center justify-center ">
            <Icons.spinner className="mr-0 h-10 w-10 animate-spin text-white " />
        </div>
    )
}