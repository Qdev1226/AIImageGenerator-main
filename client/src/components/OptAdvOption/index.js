const OptAdvOption = () => {
    return <>
        <fieldset className="create-fieldset">
            <button aria-label="Toggle advanced options" id="advanced-options-toggle">
                <div className="flex flex-row justify-center">
                    <p className="advanced-options-toggle">Show Advanced Options</p>
                </div>
            </button>
            <div className="advanced-options-container transition-all overflow-hidden opacity-0 pointer-events-none max-h-0 pb-4">
                <label>Sampler</label>
                <p>The diffusion sampling method.</p>
                <div className="select">
                    <select name="advanced-options" id="advanced-options">
                        <option value={1}>pndm (plms)</option>
                        <option value={0}>ddim</option>
                        <option value={2}>k_euler</option>
                        <option value={3}>k_euler_ancestral</option>
                        <option value={4}>k_heun</option>
                        <option value={5}>k_dpm_2</option>
                        <option value={6}>k_dpm_2_ancestral</option>
                        <option value={7}>k_lms</option>
                    </select>
                    <svg data-testid="geist-icon" fill="none" height={16} shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width={24}>
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </div>
        </fieldset>
    </>
}

export default OptAdvOption;