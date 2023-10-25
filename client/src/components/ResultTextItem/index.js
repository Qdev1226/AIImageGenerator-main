import "./resulttxtitem.scss"

const ResultTextItem = (props) => {
    // Props
    const { content } = props;

    return <>
        <div>
            <div className="text-content">
                <strong>assistant: </strong>{content}
            </div>
        </div>
    </>
}

export default ResultTextItem;