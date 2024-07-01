import { check } from "k6";
import http from "k6/http";

export default function () {
    const res = http.get("http://your-url.com");

    check(res, {
        "X-Frame-Options is DENY or SAMEORIGIN": (r) =>
            r.headers["X-Frame-Options"] === "DENY" || r.headers["X-Frame-Options"] === "SAMEORIGIN",
    });

    console.log(`Response time: ${res.timings.duration}ms`);
}
/*
Baboli, bu JAR dosyalarını projenin `lib` veya `dependencies` klasörüne eklemen iyi olur. Daha sonra `pom.xml` dosyasına aşağıdaki gibi bir bağımlılık ekleyebilirsin:

```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>MavenDependencyChecker</artifactId>
    <version>1.11.0</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/lib/instrumented-MavenDependencyChecker-1.11.0.jar</systemPath>
</dependency>
```

**Notlar:**
- `groupId` ve `artifactId` kısımlarını dosyanın içeriğine göre ayarla.
- `systemPath` kısmını dosyanın gerçek yoluna göre düzenle.

Başka bir sorunun olursa söyle!
 */