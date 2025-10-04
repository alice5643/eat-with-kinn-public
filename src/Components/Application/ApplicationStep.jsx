import React from 'react';

const ApplicationStep = ({
    step,
    totalSteps,
    title,
    description,
    children,
    onNext,
    onBack,
    nextLabel = "Continue",
    showBack = true,
    loading = false,
    showSkipButton = false,
    onSkip = null
}) => {
    return (
        <div className="w-full">
            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-body-sm text-gray-500">Step {step} of {totalSteps}</span>
                    <span className="text-body-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#FEC51C] transition-all duration-300 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Step content */}
            <div className="mb-8">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-h4 text-Mblack">{title}</h2>
                    {showSkipButton && onSkip && (
                        <button
                            onClick={onSkip}
                            className="btn-secondary !py-2 !px-4 text-body-sm whitespace-nowrap ml-4"
                        >
                            Skip for now
                        </button>
                    )}
                </div>
                {description && (
                    <p className="text-body-lg text-gray-600 mb-6">{description}</p>
                )}
                <div className="mt-6">
                    {children}
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-4 justify-between">
                {showBack ? (
                    <button
                        onClick={onBack}
                        className="btn-secondary"
                    >
                        Back
                    </button>
                ) : <div></div>}

                <button
                    onClick={onNext}
                    disabled={loading}
                    className="btn-primary"
                >
                    {nextLabel}
                </button>
            </div>
        </div>
    );
};

export default ApplicationStep;