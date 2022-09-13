import React from "react";
import ReactDOM from "react-dom/client";

class Hello extends React.Component {

    render() {
        return (
            <div /*  
                이런 식으로 넣을 수 있습니다.
                아주 신기합니다.
            */>
                {/* {}을 포함하여 이렇게 주석을 넣습니다. */}
                Hello World
            </div>
        )
    }
}

ReactDOM
.createRoot(
    document.getElementById("root")
)
.render(
    <Hello />
)