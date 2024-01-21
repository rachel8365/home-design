import React from "react";

interface QuantitySelectorProps {
    quantity?: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity = 0,
    onIncrease,
    onDecrease,
}) => {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button" onClick={onDecrease}>
                    -
                </button>
            </div>
            <input type="text" className="form-control" value={quantity} readOnly />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={onIncrease}>
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
