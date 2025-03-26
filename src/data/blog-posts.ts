export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string; // URL for the cover image
  author: string; // Author name
  authorImage: string; // URL for author image
  content?: string; // HTML content of the blog post
  slug?: string; // URL-friendly version of the title
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable APIs with Spring Boot",
    excerpt: "Learn how to create robust, scalable APIs using Spring Boot and handle millions of requests efficiently.",
    date: "June 15, 2024",
    readTime: "8 min read",
    category: "Spring Boot",
    coverImage: "https://www.jhipster.tech/assets/images/microservices_architecture_detail.006-70aebcaa49982afb023cfb895f110ffe.jpg",
    author: "Sejong CS Blog",
    authorImage: "https://avatars.githubusercontent.com/u/5116896",
    slug: "building-scalable-apis-with-spring-boot",
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4">Introduction to Scalable APIs</h2>
      <p class="mb-4">
        Building scalable APIs with Spring Boot is essential for modern backend services
        that need to handle varying loads and maintain consistent performance.
        This article explores best practices and techniques to ensure your Spring Boot
        APIs can scale effectively as your user base grows.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Key Scalability Concepts</h2>
      <p class="mb-4">
        When designing scalable APIs, several key concepts should be at the forefront:
      </p>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Statelessness - Ensure your API endpoints don't rely on server-side state</li>
        <li class="mb-2">Caching strategies - Implement appropriate caching at multiple levels</li>
        <li class="mb-2">Database optimization - Properly index and query your data</li>
        <li class="mb-2">Asynchronous processing - Offload time-consuming tasks to background processes</li>
        <li class="mb-2">Load balancing - Distribute traffic across multiple instances</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Spring Boot Configuration for Scale</h2>
      <pre class="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
        <code>
@Configuration
public class WebConfig {

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        List<Cache> caches = new ArrayList<>();
        caches.add(new ConcurrentMapCache("products"));
        caches.add(new ConcurrentMapCache("customers"));
        cacheManager.setCaches(caches);
        return cacheManager;
    }

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("Async-");
        executor.initialize();
        return executor;
    }
}
        </code>
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4">Implementing Rate Limiting</h2>
      <p class="mb-4">
        Rate limiting is crucial for protecting your API from abuse and ensuring fair resource allocation.
        Spring Boot can be integrated with bucket4j to implement token bucket rate limiting:
      </p>

      <pre class="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
        <code>
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private final Bucket bucket;

    public RateLimitInterceptor() {
        Bandwidth limit = Bandwidth.classic(100, Refill.greedy(100, Duration.ofMinutes(1)));
        this.bucket = Bucket.builder().addLimit(limit).build();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (bucket.tryConsume(1)) {
            return true;
        }

        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        return false;
    }
}
        </code>
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">
        Building scalable APIs with Spring Boot requires thoughtful architecture and implementation.
        By following the principles outlined in this article, you can create APIs that gracefully
        handle increased load and continue to provide excellent performance as your application grows.
      </p>
    `
  },
  {
    id: 2,
    title: "Optimizing Java Performance for Backend Systems",
    excerpt: "Discover techniques to optimize your Java applications for maximum performance and resource efficiency.",
    date: "May 29, 2024",
    readTime: "12 min read",
    category: "Java",
    coverImage: "https://b2461891.smushcdn.com/2461891/wp-content/uploads/2023/08/2-5-Slack-A.jpg?lossy=1&strip=1&webp=1",
    author: "Sejong CS Blog",
    authorImage: "https://avatars.githubusercontent.com/u/5116896",
    slug: "optimizing-java-performance-for-backend-systems",
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4">Why Java Performance Matters</h2>
      <p class="mb-4">
        As a student programmer diving deep into backend systems, I quickly realized that writing working code isn’t enough.
        The difference between a good backend service and a great one often lies in performance.
        Java, being a powerful and widely-used language, offers a lot of tools and practices that can either boost or bottleneck your application’s speed and efficiency.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Understanding the JVM</h2>
      <p class="mb-4">
        One of the first steps in optimizing Java applications is understanding the Java Virtual Machine (JVM).
        JVM is what makes Java “write once, run anywhere.” But to optimize your code, you need to understand how the JVM allocates memory,
        how garbage collection (GC) works, and how Just-In-Time (JIT) compilation affects performance.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Memory Management and Garbage Collection</h2>
      <p class="mb-4">
        Java automatically handles memory through garbage collection, but that doesn’t mean you can ignore memory usage.
        Creating too many objects in a loop, holding onto references unnecessarily, or relying on finalizers can slow down your program.
        Tools like VisualVM or Eclipse MAT help analyze heap usage and detect memory leaks.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Effective Data Structures</h2>
      <p class="mb-4">
        Choosing the right data structure can dramatically improve performance.
        For example, using an ArrayList vs a LinkedList makes a big difference depending on your access patterns.
        HashMaps are fast for lookups, but TreeMaps maintain order. Understand the time complexity of each and test with your own data.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Profiling and Benchmarking</h2>
      <p class="mb-4">
        Before optimizing anything, measure. Profiling tools like JFR (Java Flight Recorder), YourKit, and JProfiler show you what parts of your code take the most time or memory.
        You can use microbenchmark frameworks like JMH (Java Microbenchmark Harness) to isolate small sections of code and test their speed.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Threading and Concurrency</h2>
      <p class="mb-4">
        Java provides a rich set of concurrency utilities via the java.util.concurrent package.
        Using thread pools, executors, and concurrent collections can help take advantage of multi-core systems.
        But poorly managed threads can introduce race conditions, deadlocks, and performance issues.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">JVM Tuning</h2>
      <p class="mb-4">
        For real performance tuning, you’ll eventually need to pass JVM flags and arguments to control heap size, garbage collection strategy, etc.
        Common flags include <code>-Xmx</code>, <code>-Xms</code>, and <code>-XX:+UseG1GC</code>.
        Always test these in staging before deploying to production.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">
        Optimizing Java performance is not about premature optimization—it’s about writing clean, measurable, and efficient code.
        As student developers, mastering these skills early on sets the foundation for building scalable and maintainable systems.
        Start small, profile often, and never stop learning how Java works under the hood.
      </p>
    `
  },
  {
    id: 3,
    title: "A Guide to Microservices Architecture",
    excerpt: "Explore the benefits and challenges of implementing a microservices architecture for large-scale applications.",
    date: "May 10, 2024",
    readTime: "10 min read",
    category: "Architecture",
    coverImage: "https://microservices.io/i/Microservice_Architecture.png",
    author: "Sejong CS Blog",
    authorImage: "https://avatars.githubusercontent.com/u/5116896",
    slug: "guide-to-microservices-architecture",
    content: `
      <h2 class="text-2xl font-bold mt-8 mb-4">Introduction to Microservices Architecture</h2>
      <p class="mb-4">
        Microservices architecture breaks down applications into small, independent services that communicate over APIs.
        As a student developer, I found this architecture style fascinating because it aligns with how we think in modular code,
        but at a much larger scale.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Why Choose Microservices?</h2>
      <p class="mb-4">
        The main benefits of using microservices include scalability, independent deployments, and language flexibility.
        Unlike monolithic applications, each service can be deployed and scaled individually.
        For example, if your payment service is under heavy load, only that service can be scaled.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Building Blocks of Microservices</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Service Registry and Discovery (e.g., Eureka)</li>
        <li class="mb-2">API Gateway (e.g., Spring Cloud Gateway)</li>
        <li class="mb-2">Centralized Configuration (e.g., Spring Cloud Config)</li>
        <li class="mb-2">Communication via REST or messaging queues (e.g., RabbitMQ, Kafka)</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Example: Creating a Simple Microservice</h2>
      <pre class="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
        <code>
@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public List&lt;Product&gt; getProducts() {
        return List.of(
            new Product(1, "Laptop"),
            new Product(2, "Monitor")
        );
    }
}
        </code>
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4">Service Communication</h2>
      <p class="mb-4">
        Services in microservices need to talk to each other. One common way is via REST calls using WebClient or RestTemplate:
      </p>

      <pre class="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4">
        <code>
@Service
public class OrderService {

    private final WebClient webClient = WebClient.create("http://product-service");

    public List&lt;Product&gt; fetchProducts() {
        return webClient.get()
                .uri("/products")
                .retrieve()
                .bodyToFlux(Product.class)
                .collectList()
                .block();
    }
}
        </code>
      </pre>

      <h2 class="text-2xl font-bold mt-8 mb-4">Challenges with Microservices</h2>
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Increased complexity and overhead</li>
        <li class="mb-2">Service orchestration and monitoring</li>
        <li class="mb-2">Managing data consistency across services</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">
        Microservices architecture is powerful and scalable but requires strong DevOps culture and careful design.
        For student developers, starting with Spring Boot makes the learning curve manageable.
        Try breaking a small monolithic app into services to see the real benefit and understand the trade-offs.
      </p>
    `
  },
  {
    id: 4,
    title: "Securing Spring Boot Applications",
    excerpt: "Learn best practices for implementing security in your Spring Boot applications to protect sensitive data.",
    date: "April 22, 2024",
    readTime: "9 min read",
    category: "Security",
    coverImage: "https://nordicapis.com/wp-content/uploads/7-Top-Security-Threats-to-API-Architectures-1024x576.png",
    author: "Sejong CS Blog",
    authorImage: "https://avatars.githubusercontent.com/u/5116896",
    slug: "securing-spring-boot-applications",
    content: `
    <h2 class="text-2xl font-bold mt-8 mb-4">Why Security Matters in Spring Boot</h2>
    <p class="mb-4">
      As a student learning backend development, I quickly learned that building features is only half the job.
      Securing those features is equally important. In Spring Boot, security is built-in and powerful—but you need to know how to use it correctly.
    </p>
  
    <h2 class="text-2xl font-bold mt-8 mb-4">Getting Started with Spring Security</h2>
    <p class="mb-4">
      Spring Security is a framework that handles authentication and authorization.
      The easiest way to get started is by adding the Spring Security dependency:
    </p>
    <pre class="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4"><code>
  dependencies {
      implementation 'org.springframework.boot:spring-boot-starter-security'
  }
    </code></pre>
  
    <h2 class="text-2xl font-bold mt-8 mb-4">Basic Authentication Example</h2>
    <p class="mb-4">
      After adding the dependency, Spring Boot automatically secures all endpoints with HTTP Basic Auth.
      You’ll get a default login page with a generated password printed in the logs.
    </p>
  
    <h2 class="text-2xl font-bold mt-8 mb-4">Custom Security Configuration</h2>
    <pre class="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4"><code>
  @Configuration
  @EnableWebSecurity
  public class SecurityConfig {
  
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http.csrf().disable()
          .authorizeHttpRequests()
          .requestMatchers("/api/public").permitAll()
          .anyRequest().authenticated()
          .and()
          .httpBasic();
      return http.build();
    }
  }
    </code></pre>
  
    <h2 class="text-2xl font-bold mt-8 mb-4">Using UserDetailsService for Custom Users</h2>
    <pre class="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4"><code>
  @Service
  public class MyUserDetailsService implements UserDetailsService {
  
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      return User.withUsername("student")
                 .password(new BCryptPasswordEncoder().encode("password"))
                 .roles("USER")
                 .build();
    }
  }
    </code></pre>
  
    <h2 class="text-2xl font-bold mt-8 mb-4">Encrypting Passwords</h2>
    <pre class="bg-gray-900 p-4 rounded-md overflow-x-auto mb-4"><code>
  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
  }
    </code></pre>
  
    <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
    <p class="mb-4">
      Security might feel overwhelming at first, but with Spring Boot it becomes much easier.
      Start small—secure one route, test user roles—and gradually layer on more advanced techniques like JWT and OAuth.
      As students, we should build secure apps from day one!
    </p>
  `
  }
];
