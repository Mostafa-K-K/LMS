// function ExplainChange() {
//     const [state, updateState] = useState({ data: [] });

//     function setState(nextState) {

//         // updateState({
//         //     ...state,
//         //     ...nextState
//         // })

//         // function nextStateFunc(prevState) {
//         //     return {
//         //         ...prevState,
//         //         ...nextState
//         //     }
//         // }

//         updateState(prevState => ({
//             ...prevState,
//             ...nextState
//         }))

//     }

//     // let prevState = {}; // our state

//     // function updateState(nextState) {
//     //     if (typeof nextState === 'function') prevState = nextState(prevState)
//     //     else prevState = nextState;
//     // }

//     // old

//     function handleChange(e) {
//         let { name, value } = e.target;
//         setState({ [name]: value })
//     }
// }