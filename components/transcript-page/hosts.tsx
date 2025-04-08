import { podcastHostSocialMediaLinks } from "@/app/data/general/social-media-data"

const HostsComponent = (props: any) => {

    const { slug } = props

    return (
        <>
            <div className = "mt-2 sm:mt-3 flex-shrink-0">
                <div className = "flex -space-x-1 justify-left md:justify-center">

                    { podcastHostSocialMediaLinks.get(slug)?.map((host, idx) => 
                        <a href = "" key = { idx }>
                            {/* <img className = "inline-block h-6 w-6 rounded-full ring-2 ring-gray-100" src = {`/hosts/${slug}/${host.split(",,,")[0]}.png`}/> */}
                        </a>
                    )}

                </div>
            </div>
        </>
    );
};

export default HostsComponent;