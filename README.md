# cuddly
Cuddly is a one stop platform for all your Pet related problems, with the features to rehome your pet, adopt a pet, and know more about your with a magical touch of Artificial Intelligence and seemless UX. 

## Team 
1) Afeefuddin [Github](https://github.com/afeefuddin)
2) Subharthi Hazra [Github](https://github.com/subharthihazra)
3) Rohit Kumar [Github](https://github.com/rohitt24k)
4) Aftab Alam [Github](https://github.com/CodeItAftab)

## Features

1) **Adopt a Pet**: Whether you're feeling lonely or just need a cute companion to cuddle with, Cuddly has you covered. Our platform offers a diverse selection of pets, from cats to dogs, including popular breeds like Maine Coons, short-haired varieties, and German Shepherds. Whatever your preference, Cuddly can help you find the perfect furry friend in your city.

2) **Chat With the Owner**: Get to know the pet you're considering adopting beforehand by directly chatting with its owner through our platform. Connect with multiple pet owners to ensure you find the ideal match for your lifestyle and needs.

3) **Rehome a Pet**: We understand that circumstances change, and sometimes it's not possible to keep your beloved pet. Cuddly provides a solution by helping you find a new loving home for your pet. Our user-friendly interface allows you to upload your pet with just a few clicks. If you're unsure about your pet's details, our advanced Image Detection Model can automatically identify its type, color, and most importantly, breed, with just one click.

4) **Chat With an AI Model**: Have questions or concerns about your pet? Our highly trained AI model is here to help. Simply ask, and our AI can provide solutions to all your pet-related queries.

## Tech Stack 
1) **Frontend**

- React : Crafted with well-defined components, ensuring complete type safety through TypeScript.
- ShadCn UI :  Delivers a modern aesthetic with consistent utilization across the platform.
- Zod : Data Parsing with Zod to make the code more readable
- Tailwind :  Elevates UI design with a responsive and customizable utility-first framework.

![System Design](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1qb82vxnojwk68ti4u34.png)

2) **Backend**

- Express:  Powers the backend infrastructure for seamless data flow.
- Socket.IO: Implements real-time communication, facilitating one-to-one chat functionality.
- Gemini Pro Vision LLM: Employs cutting-edge image detection technology to automatically generate detailed pet information.
- MongoDB with Prisma: For data storage
- Redis : For caching data to reduce data reads to make the platform more scalable. 
- Cloudinary : Provides reliable storage for pet images.
- Firebase : Google authentication feature is implemented with firebase

3) **Chatbot**

- Flask Server for making the APIs
- Langchain to Interact with LLM and creating Vector Embeddings of our training Data 
- Gemini Pro 
- Hugging face Embeddings
- MongoDB Vector Search: Leverages vector database capabilities for efficient storage and retrieval.

## Future Plans

1. Implementing Video Call feature using WebRTC to connect adopter and owner of the pet directly through video calls

2. Implementing Messaging Queues Using Kafka to inform the users about new messages they received through Emails making the platform more scalable and to improve the user experience.

3. Setting Up Ecommerce store to generate revenue and sell unique Pet related Products.

## Relevant Links 

Youtube Link : [https://youtu.be/PZjfmZcSf7I?feature=shared](https://youtu.be/PZjfmZcSf7I?feature=shared)

Deployed Link : [https://cuddly-buddy.vercel.app/](https://cuddly-buddy.vercel.app/)



