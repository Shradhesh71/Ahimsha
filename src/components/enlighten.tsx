import React from "react";
import { Button } from "./ui/button";

interface EnlightenProps {
  setValue: (value: string) => void;
  chatHistory: any; 
}

const Enlighten: React.FC<EnlightenProps> = ({ setValue, chatHistory }) => {
	const englightenOption = [
	"Bhagwan Ji, how can I overcome fear and self-doubt?",
	"What is the secret to true happiness?",
	"Bhagwan Ji, how can I stay strong in tough times?",
	"How can one achieve balance in life?",
	"Bhagwan Ji, what is the purpose of human relationships?",
	"How do I let go of anger and resentment?",
	"Bhagwan Ji, what does it mean to live in the moment?",
	"How can I cultivate gratitude in daily life?",
	"Bhagwan Ji, what is the essence of true love?",
	"What is the best way to deal with failure?",
	"Bhagwan Ji, how can I control my desires and attachments?",
	"What is the true meaning of forgiveness?",
	"Bhagwan Ji, how can I overcome jealousy and envy?",
	"What role does faith play in life?",
	"Bhagwan Ji, how can I align myself with my true purpose?",
	"What is the relationship between karma and free will?",
	"Bhagwan Ji, how can I stay humble yet confident?",
	"How can one develop self-discipline?",
	"Bhagwan Ji, what is the best way to serve others?",
	"How can I find joy in the simplest of things?",
	"Bhagwan Ji, how can I stay true to myself in a challenging world?",
	"What is the significance of faith during hardships?",
	"Bhagwan Ji, how can I accept change gracefully?",
	"What does it mean to live a life of virtue?",
	"Bhagwan Ji, how can I achieve inner freedom?",
	"What is the connection between spirituality and happiness?",
	"Bhagwan Ji, how can I learn to love myself more?",
	"What is the importance of silence and reflection?",
	"Bhagwan Ji, how can I create harmony in my relationships?",
	"How can I keep my mind calm amidst chaos?",
	"Bhagwan Ji, what does it mean to truly surrender to a higher power?",
	];

	const englighten = () => {
		const randomValue = Math.floor(Math.random() * englightenOption.length);
		setValue(englightenOption[randomValue]);
	};

	return (
		<div className="">
			{/* <p>Hey Parth, what bothers you ?</p> */}
			<Button variant="secondary" className="mr-5" disabled={!chatHistory} onClick={englighten}>Enlighten Me!</Button>
		</div>
	);
};

export default Enlighten;