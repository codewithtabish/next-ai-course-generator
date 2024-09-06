/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyCsaq_BF5_DRGws1K6rQ7TpFCD1TW4paHI";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "\nGenerate a course totorial on following detail with field Course Name ,description,along with chapter Name,about,duration:\nCategory:'programming',topic:'javascript',level:'Basic',duration:'2 hours',noOfChapters:'5' in JSON format",
        },
        {
          text: '```json\n{\n  "courseName": "JavaScript Fundamentals for Beginners",\n  "description": "This course provides a comprehensive introduction to the JavaScript programming language, covering essential concepts and techniques for building interactive web applications. From basic syntax to data structures and functions, you\'ll learn the fundamentals of JavaScript through hands-on examples and projects.",\n  "chapters": [\n    {\n      "chapterName": "Introduction to JavaScript",\n      "about": "This chapter introduces the basics of JavaScript, including its history, purpose, and how it interacts with HTML and CSS.",\n      "duration": "30 minutes"\n    },\n    {\n      "chapterName": "Variables, Data Types, and Operators",\n      "about": "Learn about different data types in JavaScript, how to declare variables, and how to use operators for calculations and comparisons.",\n      "duration": "45 minutes"\n    },\n    {\n      "chapterName": "Control Flow and Loops",\n      "about": "This chapter explores conditional statements, loops, and other control flow mechanisms for creating dynamic and interactive code.",\n      "duration": "45 minutes"\n    },\n    {\n      "chapterName": "Functions and Scope",\n      "about": "Learn how to define and use functions to organize your code, understand variable scope, and write reusable blocks of logic.",\n      "duration": "45 minutes"\n    },\n    {\n      "chapterName": "Arrays and Objects",\n      "about": "This chapter covers fundamental data structures like arrays and objects, demonstrating how to manipulate and access data within them.",\n      "duration": "30 minutes"\n    }\n  ],\n  "category": "programming",\n  "topic": "javascript",\n  "level": "Basic",\n  "duration": "2 hours",\n  "noOfChapters": "5"\n}\n```',
        },
      ],
    },
  ],
});

export const GenerateChapterContent = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in detail on topic:java programming,Chapter Concurrency and Multithreading in Java in JSON format with list of array with field as a title,\n          description in detail code Example ( code field in <precode> format) if applicable\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "Introduction to Concurrency and Multithreading",\n    "description": "Concurrency is the ability of a system to handle multiple tasks at the same time, while multithreading is a technique for achieving concurrency within a single process. In Java, threads are lightweight units of execution that share the same memory space, allowing for efficient communication and resource sharing.",\n    "code": ""\n  },\n  {\n    "title": "Creating and Starting Threads",\n    "description": "You can create threads in Java using the `Thread` class. There are two primary ways to do this: \\n\\n1. **Extending the `Thread` class:**  Create a subclass of `Thread` and override the `run()` method to define the thread\'s execution logic.\\n2. **Implementing the `Runnable` interface:**  Implement the `Runnable` interface, which defines a `run()` method, and then create a `Thread` object that wraps the `Runnable` instance.",\n    "code": "<precode>\\n// Extending the Thread class\\nclass MyThread extends Thread {\\n  @Override\\n  public void run() {\\n    // Thread\'s execution logic here\\n  }\\n}\\n\\n// Implementing the Runnable interface\\nclass MyRunnable implements Runnable {\\n  @Override\\n  public void run() {\\n    // Thread\'s execution logic here\\n  }\\n}\\n\\n// Creating and starting threads\\nMyThread thread1 = new MyThread();\\nthread1.start();\\n\\nRunnable runnable = new MyRunnable();\\nThread thread2 = new Thread(runnable);\\nthread2.start();\\n</precode>"\n  },\n  {\n    "title": "Thread Lifecycle and States",\n    "description": "A thread in Java goes through various states during its lifetime. These states include:\\n\\n1. **New:**  The thread is created but not yet started.\\n2. **Runnable:**  The thread is ready to be executed by the JVM.\\n3. **Running:**  The thread is currently executing instructions.\\n4. **Blocked:**  The thread is waiting for a resource or condition to become available.\\n5. **Terminated:**  The thread has completed its execution or has been stopped.",\n    "code": ""\n  },\n  {\n    "title": "Thread Synchronization",\n    "description": "Synchronization is crucial when multiple threads need to access shared resources concurrently. Without synchronization, race conditions can occur, leading to inconsistent data and program errors. In Java, you can use the following mechanisms to synchronize threads:\\n\\n1. **`synchronized` keyword:**  This keyword can be used to define synchronized methods or blocks of code. Only one thread can execute a synchronized method or block at a time, ensuring data consistency.\\n2. **`ReentrantLock` class:**  This class provides a more flexible way to manage synchronization, allowing for more control over locking and unlocking. It also supports reentrant locking, where a thread can acquire the lock multiple times without blocking itself.",\n    "code": "<precode>\\npublic class Counter {\\n  private int count = 0;\\n\\n  public synchronized void increment() {\\n    count++;\\n  }\\n}\\n\\n// Using ReentrantLock\\npublic class Counter2 {\\n  private int count = 0;\\n  private final ReentrantLock lock = new ReentrantLock();\\n\\n  public void increment() {\\n    lock.lock();\\n    try {\\n      count++;\\n    } finally {\\n      lock.unlock();\\n    }\\n  }\\n}\\n</precode>"\n  },\n  {\n    "title": "Inter-Thread Communication",\n    "description": "Threads need to communicate with each other in various scenarios, such as exchanging data or coordinating actions. Java provides mechanisms for inter-thread communication, including:\\n\\n1. **`wait()` and `notify()` methods:** These methods are used to pause a thread and signal other threads about a change in state. A thread can call `wait()` to wait for a condition to become true, and another thread can call `notify()` or `notifyAll()` to wake up waiting threads. \\n2. **`Semaphore` class:** Semaphores act as guards that limit the number of threads that can access a shared resource simultaneously. They are useful for controlling access to limited resources, such as database connections or network sockets.\\n3. **`BlockingQueue` interface:** Blocking queues provide a thread-safe way for threads to communicate by exchanging data. Threads can add data to the queue and other threads can remove data from it.",\n    "code": "<precode>\\n// Using wait() and notify()\\npublic class ProducerConsumer {\\n  private Object lock = new Object();\\n  private int data = 0;\\n  private boolean dataAvailable = false;\\n\\n  public void produce(int value) {\\n    synchronized (lock) {\\n      while (dataAvailable) {\\n        try {\\n          lock.wait();\\n        } catch (InterruptedException e) {} \\n      }\\n      data = value;\\n      dataAvailable = true;\\n      lock.notify();\\n    }\\n  }\\n\\n  public int consume() {\\n    synchronized (lock) {\\n      while (!dataAvailable) {\\n        try {\\n          lock.wait();\\n        } catch (InterruptedException e) {} \\n      }\\n      dataAvailable = false;\\n      lock.notify();\\n      return data;\\n    }\\n  }\\n}\\n</precode>"\n  },\n  {\n    "title": "Thread Pools",\n    "description": "Thread pools are collections of threads that can be reused for executing tasks. This helps to improve performance by reducing the overhead of thread creation and destruction. The `ExecutorService` interface in Java provides a mechanism for managing thread pools. It allows you to submit tasks for execution and control the size and behavior of the thread pool.",\n    "code": "<precode>\\n// Creating an ExecutorService with a fixed thread pool size\\nExecutorService executor = Executors.newFixedThreadPool(5);\\n\\n// Submitting tasks\\nfor (int i = 0; i < 10; i++) {\\n  executor.execute(() -> { \\n    // Task logic here \\n  });\\n}\\n\\n// Shutting down the ExecutorService\\nexecutor.shutdown();\\n</precode>"\n  },\n  {\n    "title": "Thread Safety",\n    "description": "Thread safety refers to ensuring that code behaves correctly even when accessed by multiple threads simultaneously. To achieve thread safety, you need to consider the following factors: \\n\\n1. **Immutable objects:** Objects that cannot be modified after creation are inherently thread-safe. \\n2. **Synchronization:** As discussed earlier, using `synchronized` or `ReentrantLock` can help protect shared resources from concurrent access.\\n3. **Thread-safe collections:** Java provides thread-safe data structures, such as `ConcurrentHashMap` and `CopyOnWriteArrayList`, which are designed for concurrent access.",\n    "code": ""\n  },\n  {\n    "title": "Concurrency Utilities",\n    "description": "Java provides various utilities for working with concurrency, including:\\n\\n1. **`Atomic` classes:** These classes provide atomic operations for variables, ensuring that updates are performed indivisibly. Examples include `AtomicInteger`, `AtomicLong`, and `AtomicBoolean`.\\n2. **`CountDownLatch` class:** A `CountDownLatch` acts as a coordination point for threads, allowing threads to wait until a certain number of events have occurred.\\n3. **`CyclicBarrier` class:**  A `CyclicBarrier` allows threads to wait until all threads in a group have reached a certain point before proceeding. \\n4. **`Phaser` class:** Phasers are more flexible than cyclic barriers, providing more control over the coordination of threads.",\n    "code": ""\n  },\n  {\n    "title": "Best Practices for Concurrency",\n    "description": "Follow these best practices to write efficient and reliable concurrent code:\\n\\n1. **Keep critical sections short:** Minimize the time spent inside synchronized blocks or methods.\\n2. **Avoid unnecessary synchronization:** Only synchronize code that actually needs it.\\n3. **Use thread-safe data structures:** Utilize built-in thread-safe collections when appropriate.\\n4. **Use thread pools:** Reuse threads to reduce overhead.\\n5. **Test your code thoroughly:**  Thoroughly test your concurrent code under various conditions to ensure correctness and stability.",\n    "code": ""\n  }\n]\n```',
        },
      ],
    },
  ],
});
