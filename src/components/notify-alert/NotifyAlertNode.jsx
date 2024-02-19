import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// import PropTypes from "prop-types";

function NotifyAlertNode({ children, domSelector }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (domSelector) {
      ref.current = document.querySelector(domSelector);
    } else {
      ref.current = document.body;
    }
    setMounted(true);
  }, [domSelector]);

  return mounted ? createPortal(children, ref.current) : null;
}

// NotifyAlertNode.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
//   domSelector: PropTypes.string,
// };
export default NotifyAlertNode;
