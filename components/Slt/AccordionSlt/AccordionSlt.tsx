import {useState} from "react";
import classes from "./AccordionSlt.module.css";
import {AccordionSltProps} from "@/components/Slt/AccordionSlt/AccordionSlt.props";

const AccordionSlt = ({title, children}: AccordionSltProps) => {
    const [showTextArea, setShowTextArea] = useState(false);
    const collapseToggle = () => {
        setShowTextArea(!showTextArea);
    }
    return (
        <div className={classes.information}>
            <button onClick={collapseToggle} className={classes.toggleButton}>
                {title}
                <span className={`${classes.arrow} ${showTextArea ? classes.rotate : ""}`}>&#10097;</span>
            </button>
            {showTextArea && (
                <div className={classes.textArea}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccordionSlt;