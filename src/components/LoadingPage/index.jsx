import Loader from "../Loader"
import Title from "../Title"
import "./styles.scss"

export default function LoaderPage() {
    return (
        <main className="center loader-page">
            <div className="container-loader-page center between">
                <div />
                <Title />
                <Loader />
            </div>
            <div className="blur" />
        </main>
    )
}