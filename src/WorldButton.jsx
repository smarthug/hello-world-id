import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
console.log(VerificationLevel)
// ...

console.log(import.meta.env)

export default function WorldButton() {
    const onSuccess = (result) => {
        // This is the callback when the modal is closed
        console.log('onSuccess', result);
    }

    const handleVerify = async (proof) => {
        // This is the callback when the proof is received
        console.log('handleVerify', proof);

        const res = await fetch('https://hello-world-id.pages.dev/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proof),
        });

        const data = await res.json();
        console.log('Verification result:', data);

    
    }

    const test = async () => {

        const res = await fetch('https://hello-world-id.pages.dev/helloworld', {
            method:"GET",
        });
        const data = await res.json();
        console.log('Verification result:', data);

    }

    return (

        <IDKitWidget
            app_id={import.meta.env.VITE_APP_ID} // obtained from the Developer Portal
            action={import.meta.env.VITE_ACTION_ID} // obtained from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // callback when the proof is received
            onError={(error) => {
                // This is the callback when an error occurs
                console.error('onError', error);
            }}
            signal="user_value"
            verification_level={VerificationLevel.Orb}
        >
            {({ open }) =>
                // This is the button that will open the IDKit modal
                <button onClick={open}>Verify with World ID</button>
            }
        </IDKitWidget>

    )
}
