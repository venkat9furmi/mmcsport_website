import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="display text-2xl mt-10 mb-3" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-muted text-[17px] leading-[1.7] mb-5" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="list-slash mt-2 mb-6" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="text-muted text-[16px] py-1.5" {...props} />
  ),
};

export default function MdxArticle({ source }: { source: string }) {
  return (
    <div className="max-w-[70ch]">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
