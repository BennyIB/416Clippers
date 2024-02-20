const MapControl = (props) => {

    return (
        <div className="absolute right-5 bottom-5 z-10 flex flex-col">

            <button
                className="mb-2 bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={props.zoomIn}
            >
                +
            </button>

            <button
                className="mb-2 bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={props.zoomOut}
            >
                -
            </button>

            <button
                className="bg-blue-500 text-white font-bold p-2 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={props.resetZoom}
            >
                🔙
            </button>
        </div>
    );
}
export default MapControl;