import { defineComponent, ref  } from 'vue'


export default defineComponent (() => {
    
    const constRef = ref(1)
    const btnCli = () => {
        constRef.value += 1
    }

    const render = () => {
        return <div>{constRef}</div>
    }

    return render
})