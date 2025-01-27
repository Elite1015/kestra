package io.kestra.storage.local;

import com.google.common.io.CharStreams;
import io.kestra.core.storage.StorageTestSuite;
import io.kestra.core.utils.IdUtils;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

class LocalStorageTest extends StorageTestSuite {
    // Leading slash configuration is not available for local storage as we're dealing with absolute paths only so we just check leading slash doesn't matter
    @Override
    protected void leadingSlash() throws Exception {
        String prefix = IdUtils.create();

        assertThat(storageInterface.normalizePath("/a/b"), is("a/b"));
        assertThat(storageInterface.normalizePath("a/b"), is("a/b"));

        String firstFileRelativePath = prefix + "/storage/first.yml";
        putFile(null, "/" + firstFileRelativePath);
        String secondFileRelativePath = prefix + "/storage/second.yml";
        putFile(null, secondFileRelativePath);

        URI item = new URI("/" + firstFileRelativePath);
        InputStream get = storageInterface.get(null, prefix, item);
        assertThat(CharStreams.toString(new InputStreamReader(get)), is(CONTENT_STRING));
        item = new URI(firstFileRelativePath);
        get = storageInterface.get(null, prefix, item);
        assertThat(CharStreams.toString(new InputStreamReader(get)), is(CONTENT_STRING));

        item = new URI("/" + secondFileRelativePath);
        get = storageInterface.get(null, prefix, item);
        assertThat(CharStreams.toString(new InputStreamReader(get)), is(CONTENT_STRING));
        item = new URI(secondFileRelativePath);
        get = storageInterface.get(null, prefix, item);
        assertThat(CharStreams.toString(new InputStreamReader(get)), is(CONTENT_STRING));

        assertThat(storageInterface.exists(null, prefix, new URI(firstFileRelativePath)), is(true));
        assertThat(storageInterface.exists(null, prefix, new URI("/" + firstFileRelativePath)), is(true));
        assertThat(storageInterface.exists(null, prefix, new URI(secondFileRelativePath)), is(true));
        assertThat(storageInterface.exists(null, prefix, new URI("/" + secondFileRelativePath)), is(true));
    }
}
