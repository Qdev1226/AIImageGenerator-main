const OptSeed = (props) => {
    return <>
        <fieldset className="create-fieldset">
            <label htmlFor="seed-input">Seed</label>
            <p>Different numbers result in new variations of your image.</p>
            <input id="seed-input" className="text-input" disabled type="number" defaultValue />
            <div className="flex items-center gap-x-2">
                <label className="chakra-checkbox css-192puf7" data-checked>
                    <input
                        className="chakra-checkbox__input"
                        type="checkbox"
                        id="randomize-seed"
                        style={{ border: '0px', clip: 'rect(0px, 0px, 0px, 0px)', height: '1px', width: '1px', margin: '-1px', padding: '0px', overflow: 'hidden', whiteSpace: 'nowrap', position: 'absolute' }} />
                    <span className="chakra-checkbox__control css-19ag05x" data-checked aria-hidden="true">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', transform: 'none' }}>
                            <svg viewBox="0 0 12 10" className="css-1x1o9fj" opacity={1} strokeDashoffset={0} style={{ fill: 'none', strokeWidth: 2, stroke: 'currentcolor', strokeDasharray: 16 }}>
                                <polyline points="1.5 6 4.5 9 10.5 1" />
                            </svg>
                        </div>
                    </span>
                </label>
                <label htmlFor="randomize-seed" className="mt-1 text-sm text-gray-300">Randomize each number to get new variations</label>
            </div>
        </fieldset>
    </>
}

export default OptSeed;