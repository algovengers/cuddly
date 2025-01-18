import os
from dotenv import load_dotenv
load_dotenv()
from pymongo import MongoClient
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import DirectoryLoader,PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore


loader = DirectoryLoader('./files',glob='./*.pdf',loader_cls=PyPDFLoader)
documents = loader.load()

print(len(documents))


text_splitter = RecursiveCharacterTextSplitter(
                                               chunk_size=500, 
                                               chunk_overlap=200)

texts = text_splitter.split_documents(documents)
print(len(texts))


pinecone_api_key=os.getenv('PINECONE_API_KEY')
pc = Pinecone(api_key=pinecone_api_key)
index_name = os.getenv('PINCONE_INDEX')
existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]

if index_name not in existing_indexes:
    print("Index don't exists, creating index")
    pc.create_index(
        name=index_name,
        dimension=1024,
        metric="cosine", 
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
    ) 
    )

index = pc.Index(index_name)

print("Creating embeddings")

embeddings = HuggingFaceEmbeddings(model_name="intfloat/multilingual-e5-large",
                                       model_kwargs={'device': 'cpu'})


vector_store = PineconeVectorStore(index=index,embedding=embeddings)

vector_store.add_documents(documents=texts)




print("Embedding created")